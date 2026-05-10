
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className='h-2/3 flex items-center justify-center'>
        <Spinner className="mx-auto" />
    </div>
  )
}
