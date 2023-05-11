import React, { FC } from "react";
import styles from "./Button.module.scss";

interface BookButtonProps {
  onBook: () => void;
  isBooked: boolean;
}

const BookButton: FC<BookButtonProps> = ({ onBook, isBooked }) => {
  const buttonStyles = [
    styles.bookButton,
    isBooked ? styles.booked : null,
  ].join(" ");
  return (
    <button className={buttonStyles} onClick={onBook}>
      {isBooked ? "Booked ✅" : "Book Now"}
    </button>
  );
};

export default BookButton;
