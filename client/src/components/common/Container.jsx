const Container = ({ children, className = "", as: Component = "div" }) => {
  return (
    <Component className={`container-custom ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
