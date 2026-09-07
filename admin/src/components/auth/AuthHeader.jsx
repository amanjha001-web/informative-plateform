const AuthHeader = ({ title, description }) => {
  return (
    <div className="auth-header">
      <h1 className="auth-header__title">{title}</h1>

      <p className="auth-header__description">{description}</p>
    </div>
  );
};

export default AuthHeader;
