
const GoogleForm = (props) => {
  return (
    <div id="app-form">
      <iframe height="100%" width="100%" src={props.url} title="Grading Form" frameBorder="0" ></iframe>
    </div>
  )
}

export default GoogleForm
