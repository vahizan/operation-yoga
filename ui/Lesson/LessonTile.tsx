import React, { FC, MouseEventHandler, useState } from "react";
import styles from "./LessonTile.module.scss";
import BookButton from "../Button/BookButton";

interface LessonTileProps {
  startTime: Date;
  endTime: Date;
  instructor: string;
  availability?: number;
  lessonName: string;
  location: string;
}

const LessonTile: FC<LessonTileProps> = ({
  startTime,
  endTime,
  instructor,
  availability,
  lessonName,
  location,
}) => {
  const [selected, setSelected] = useState(false);
  const [isBook, setBooked] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };

  const tileStyles = [
    styles.tile,
    selected ? styles.selectedTile : null,
    availability ? null : styles.unavailableTile,
  ].join(" ");

  const onBook = () => {
    setBooked(true);
  };

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const start = `${startDate.getHours()}:${startDate.getMinutes()}`;
  const end = `${endDate.getHours()}:${endDate.getMinutes()}`;
  return (
    <div className={tileStyles}>
      <div className={styles.lessonContainer} onClick={handleSelect}>
        <h2 className={styles.lessonName}>{lessonName}</h2>
        <p className={styles.instructor}>Instructor: {instructor}</p>
        {startTime && endTime && (
          <p className={styles.time}>
            Time: {start} - {end}
          </p>
        )}
        <p className={styles.location}>location: {location}</p>
      </div>
      <BookButton isBooked={isBook} onBook={onBook} />
    </div>
  );
};

export default LessonTile;
