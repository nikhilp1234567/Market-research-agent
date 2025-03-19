import Link from "next/link";
import { Button } from "./ui/button";

export default function DeployButton() {
  return (
    <>
      <Link
        href='https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnikhilp1234567%2FMarket-research-agent&project-name=market-research-agent&repository-name=market-research-agent&demo-title=Market Research Agent&demo-description=An AI-powered application that provides market research and instant feedback on product ideas'
        target='_blank'>
        <Button className='flex items-center bg-blue-900 gap-2' size={"sm"}>
          <svg className='h-3 w-3' viewBox='0 0 76 65' fill='hsl(var(--background)/1)' xmlns='http://www.w3.org/2000/svg'>
            <path d='M37.5274 0L75.0548 65H0L37.5274 0Z' fill='inherit' />
          </svg>
          <span>Deploy to Vercel</span>
        </Button>
      </Link>
    </>
  );
}
