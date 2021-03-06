import React from "react";
import { InView } from "react-intersection-observer";

import SectionHeader from "../SectionHeader/SectionHeader";
import ItemBox from "../ItemBox/ItemBox";
import BounceLoader from "../Spinners/BounceLoader/BounceLoader";

import { joinClassesWithSpace } from "../../Helpers/helperFunctions";

import * as styles from "./MoviesList.module.scss";

const MoviesList = ({
  title,
  emptyListMsg,
  addTitle,
  removeTitle,
  totalMovies,
  loadedMovies,
  isLoading,
  rechedEnd,
  askForMore,
  likeNewMovie,
  matchList = [],
  removeUserMovie,
  children,
}) => {
  const matchedLoadedMovies = loadedMovies.map((movie) =>
    matchList.find((matchMovie) => matchMovie?.id === movie?.id) != null
      ? { ...movie, seleceted: true }
      : movie
  );
  return (
    <div
      className={joinClassesWithSpace(
        styles.MoviesList,
        askForMore && styles.dynamicList
      )}
    >
      <SectionHeader title={title}>
        <p className={styles.totalMovies}>{`${totalMovies} Movies`}</p>
      </SectionHeader>
      {totalMovies === 0 && (
        <div className={styles.emptyListMsg}>{emptyListMsg}</div>
      )}
      <div className={styles.moviesContainer}>
        {children}
        {matchedLoadedMovies.map((item) => (
          <ItemBox
            key={item.id}
            item={item}
            likeNewMovie={likeNewMovie}
            addTitle={addTitle}
            removeTitle={removeTitle}
            removeUserMovie={removeUserMovie}
          />
        ))}
      </div>
      {askForMore && (
        <div className={styles.sectionFooter}>
          <InView
            threshold={1}
            onChange={(inView, entry) => {
              if (inView && !isLoading && askForMore) {
                askForMore();
              }
            }}
          >
            {({ inView, ref }) => {
              return isLoading ? (
                <BounceLoader
                  topMsg="Loading..."
                  bottomMsg="Please Waiat."
                  myRef={ref}
                />
              ) : rechedEnd ? (
                <p className={styles.theEnd} ref={ref}>
                  The End
                </p>
              ) : (
                <button
                  className={styles.askForMore}
                  onClick={askForMore && askForMore}
                  ref={ref}
                >
                  Show more
                </button>
              );
            }}
          </InView>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
