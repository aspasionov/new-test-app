export const Button = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={`text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
