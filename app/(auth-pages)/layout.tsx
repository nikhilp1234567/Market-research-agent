export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-full flex flex-1 justify-center'>{children}</div>;
}
