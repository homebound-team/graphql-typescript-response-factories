export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Author = AuthorLike & {
  __typename?: 'Author';
  birthday?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  popularity: Popularity;
  summary: AuthorSummary;
  working?: Maybe<Working>;
};

export type AuthorInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AuthorLike = {
  name: Scalars['String']['output'];
};

export type AuthorSummary = {
  __typename?: 'AuthorSummary';
  amountOfSales?: Maybe<Scalars['Float']['output']>;
  author: Author;
  numberOfBooks: Scalars['Int']['output'];
};

export type Book = {
  __typename?: 'Book';
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveAuthor: SaveAuthorResult;
  saveAuthorLike: Array<AuthorLike>;
};


export type MutationSaveAuthorArgs = {
  input: AuthorInput;
};


export type MutationSaveAuthorLikeArgs = {
  input: AuthorInput;
};

export enum Popularity {
  High = 'High',
  Low = 'Low'
}

export type Query = {
  __typename?: 'Query';
  authorSummaries: Array<AuthorSummary>;
  authors: Array<Author>;
  currentAuthor?: Maybe<Author>;
  search: Array<SearchResult>;
};


export type QueryAuthorsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArgs = {
  query: Scalars['String']['input'];
};

export type SaveAuthorLikeResult = {
  __typename?: 'SaveAuthorLikeResult';
  authors: Array<AuthorLike>;
};

export type SaveAuthorResult = {
  __typename?: 'SaveAuthorResult';
  author: Author;
};

export type SearchResult = Author | Book;

export enum Working {
  No = 'NO',
  Yes = 'YES'
}
