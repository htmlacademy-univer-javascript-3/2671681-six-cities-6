import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateComponentProps = {
  children: JSX.Element;
};

function PrivateComponent({
  children,
}: PrivateComponentProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.Auth ? children : null;
}

export default PrivateComponent;
