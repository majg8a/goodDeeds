import { inject, Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  limit,
  orderBy,
  startAfter,
  getDocs,
  DocumentData,
  CollectionReference,
  Timestamp,
  collectionData,
  collectionSnapshots,
  where,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { UserService } from './user.service';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { makeUpdater } from '../scripts/makeUpdater';

export interface GoodDeed {
  id: string;
  description: string;
  createdAt: Timestamp;
  author_uid: string;
  parentId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoodDeedsService {
  userService = inject(UserService);
  firestore = inject(Firestore);
  goodDeedsRef = collection(this.firestore, 'goodDeeds') as CollectionReference<
    GoodDeed,
    DocumentData
  >;

  readonly PAGE_SIZE = 100;

  state = signal<GoodDeedsState>({
    isLoading: false,
  });
  updateState = makeUpdater(this.state);

  author_uid = signal<string | null>(null);
  author_uid$ = this.userService.user$
    .pipe(
      map((user) => user.uid),
      takeUntilDestroyed()
    )
    .subscribe((uid) => {
      this.author_uid.set(uid);
    });

  goodDeedReq$ = new Subject<string>();
  goodDeedReq = this.goodDeedReq$
    .asObservable()
    .pipe(
      switchMap((id) =>
        collectionData(query(this.goodDeedsRef, where('id', '==', id)))
      ),
      tap(([goodDeed]) => {
        this.updateState('goodDeed', goodDeed);
      }),
      takeUntilDestroyed()
    )
    .subscribe();

  goodDeedsReqBehavior$ = new BehaviorSubject<null>(null);
  goodDeedsReqSub = this.goodDeedsReqBehavior$
    .asObservable()
    .pipe(
      switchMap(() => {
        this.updateState('isLoading', true);

        let baseQuery = query(
          this.goodDeedsRef,
          orderBy('createdAt', 'desc'),
          limit(this.PAGE_SIZE)
        );

        return collectionData(baseQuery);
      }),

      tap((goodDeeds) => {
        this.updateState('goodDeeds', goodDeeds);
        this.updateState('isLoading', false);
      }),
      catchError(() => {
        this.updateState('isLoading', false);
        return of([]);
      }),
      takeUntilDestroyed()
    )
    .subscribe();

  goodDeedsByUserReqSubject$ = new Subject<string>();
  goodDeedsByUserReqSub = this.goodDeedsByUserReqSubject$
    .asObservable()
    .pipe(
      switchMap((uid) => {
        this.updateState('isLoading', true);
        console.log(uid);

        let baseQuery = query(
          this.goodDeedsRef,
          orderBy('createdAt', 'desc'),
          where('author_uid', '==', uid),
          limit(this.PAGE_SIZE),
        );

        return collectionData(baseQuery);
      }),

      tap((goodDeeds) => {
        console.log(goodDeeds);
        
        this.updateState('goodDeedsByUser', goodDeeds);
        this.updateState('isLoading', false);
      }),
      catchError(() => {
        this.updateState('isLoading', false);
        return of([]);
      }),
      takeUntilDestroyed()
    )
    .subscribe();

  async createGoodDeed(description: string, parentId?: string): Promise<void> {
    const authorId = this.author_uid();

    if (!authorId) {
      console.error('Cannot create deed: User not authenticated.');
      throw new Error('User authentication is required to create a good deed.');
    }

    this.updateState('isLoading', true);

    try {
      const docRef = doc(this.goodDeedsRef);
      const newId = docRef.id;

      const newDeed: GoodDeed = {
        id: newId,
        description: description,
        author_uid: authorId,
        createdAt: Timestamp.now(),
        parentId: parentId,
      };

      await setDoc(docRef, newDeed);
    } catch (error) {
      console.error('Error creating Good Deed:', error);
      throw new Error('Failed to save good deed. Check console for details.');
    } finally {
      this.updateState('isLoading', false);
    }
  }
}

export interface GoodDeedsState {
  goodDeed?: GoodDeed;
  goodDeeds?: GoodDeed[];
  lastVisibleDoc?: GoodDeed;
  isLoading: boolean;
  goodDeedsByUser?: GoodDeed[];
}
