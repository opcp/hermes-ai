import { Button, Spinner } from 'react-bootstrap'

export default function LoadingButton(props) {
  return (
    <Button {...props} disabled={props.isLoading}>
      {props.isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        props.children
      )}
    </Button>
  )
}
