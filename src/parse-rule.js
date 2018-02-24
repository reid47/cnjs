// const regex = /\.(lol)?([a-zA-Z0-9_-]+)([\:a-zA-Z\[\]]*)[ ]*{(.*)}/;
const regex = new RegExp(
  '.' + '(@[a-z]+)?' + '([a-z0-9_-]+)' + '([:a-z[]]*)' + '[ ]*{(.*)}',
  'i'
);

const parseRule = ruleString => {
  const parts = ruleString.match(regex);
  // console.log({ parts });

  const at = parts[1];
  const className = parts[2];
  const pseudo = parts[3];
  const ruleText = parts[4].replace(/;[ ]+/, ';');

  return {
    valid: true,
    at: '',
    className,
    pseudo,
    ruleText
  };
};

export { parseRule };
