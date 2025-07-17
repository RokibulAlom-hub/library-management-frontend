
import { decrement, increment } from './counterSlice'
import { Button } from '@/components/ui/button'
import { useappDispacth, useappSelector } from '@/redux/hook'

export function Counter() {
  const {count} = useappSelector((state) => state.counter)
  const dispatch = useappDispacth()

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  )
}