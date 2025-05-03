const KEY_PREFIX = "--";


function parseAppKeys(args) {
    return args.reduce((acc, value) => {
        
        if(!String(value).startsWith(KEY_PREFIX)) {
            return;
        }

        const keyValuePair = value.substring(KEY_PREFIX.length).split("=");

        if (keyValuePair.length === 2 && keyValuePair[0] && keyValuePair[1]) {
            acc[keyValuePair[0]] = keyValuePair[1]
        }

        return acc;
    }, {});
}

export default function getAppArgs(args, keyValue) {
  const [, , ...appArgs] = args;

  if (keyValue) {
    return parseAppKeys(appArgs)[keyValue];
  } else {
    return parseAppKeys(appArgs);
  }
}

