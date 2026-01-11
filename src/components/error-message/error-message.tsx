import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getError } from '../../store/main-data/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,

    padding: '14px 20px',
    backgroundColor: '#ffe0e0',
    color: '#a00000',
    borderBottom: '1px solid #ffb3b3',

    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'center',

    zIndex: 9999,
  } as const;

  return error ? <div style={style}>{error}</div> : null;
}

const MemoizedErrorMessage = memo(ErrorMessage);
export default MemoizedErrorMessage;
