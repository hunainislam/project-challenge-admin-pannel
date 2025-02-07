export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {children}
      </div>
    );
  }