export const RatingStar = ({ rating }: { rating: number }) => {

  switch (Number(rating)) {
    case 0:
      return <span className="rating">○○○○○</span>;
    case 1:
      return <span className="rating">◐○○○○</span>;
    case 2:
      return <span className="rating">●○○○○</span>;
    case 3:
      return <span className="rating">●◐○○○</span>;
    case 4:
      return <span className="rating">●●○○○</span>;
    case 5:
      return <span className="rating">●●◐○○</span>;
    case 6:
      return <span className="rating">●●●○○</span>;
    case 7:
      return <span className="rating">●●●◐○</span>;
    case 8:
      return <span className="rating">●●●●○</span>;
    case 9:
      return <span className="rating">●●●●◐</span>;
    case 10:
      return <span className="rating">●●●●●</span>;
    default:
      return <span className="rating">●●●●●</span>;

  }

}
