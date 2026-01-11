
type BookmarkButtonProps = {
  isActive: boolean;
  onClick: () => void;
  width: number;
  height: number;
  variant: 'place-card' | 'offer';
}

function BookmarkButton({ isActive, onClick, width, height, variant }: BookmarkButtonProps): JSX.Element {
  return(
    <button
      className={
        isActive
          ? `${variant}__bookmark-button ${variant}__bookmark-button--active button`
          : `${variant}__bookmark-button button`
      }
      type="button"
      onClick={onClick}
    >
      <svg className={`${variant}__bookmark-icon`} width={width} height={height}>
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
