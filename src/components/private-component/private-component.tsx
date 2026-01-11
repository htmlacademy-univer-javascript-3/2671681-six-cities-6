import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateComponentProps = {
  children: JSX.Element;
};

function PrivateComponent({
  children,
}: PrivateComponentProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : null;
}

export default PrivateComponent;
