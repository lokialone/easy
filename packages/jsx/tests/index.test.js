const el = (props) => (
    <div onClick={props.onClick}>
      <Icon src={props.icon} /><span>{props.text}</span>
    </div>
);


const el = (props) => (
    h(
      "div",
      { onClick: props.onClick },
      h(Icon, { src: props.icon }),
      h(
        "span",
        null,
        props.text
      )
    )
)
  