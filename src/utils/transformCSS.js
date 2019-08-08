import cssParser from 'css';

function transformRules(self, rules, result) {
  rules.forEach((rule) => {
    const obj = {};
    if (rule.type === 'media') {
      const name = mediaNameGenerator(rule.media);
      const media = result[name] = result[name] || {
        __expression__: rule.media,
      };
      transformRules(self, rule.rules, media);
    } else if (rule.type === 'rule') {
      rule.declarations.forEach((declaration) => {
        if (declaration.type === 'declaration') {
          const cleanProperty = cleanPropertyName(declaration.property);
          obj[cleanProperty] = declaration.value;
        }
      });
      rule.selectors.forEach((selector) => {
        const name = nameGenerator(selector.trim());
        result[name] = obj;
      });
    }
  });
}

var cleanPropertyName = function (name) {
  // turn things like 'align-items' into 'alignItems'
  name = name.replace(/(-.)/g, v => v[1].toUpperCase());

  return name;
};

var mediaNameGenerator = function (name) {
  return `@media ${name}`;
};

var nameGenerator = function (name) {
  name = name.replace(/\s\s+/g, ' ');
  name = name.replace(/[^a-zA-Z0-9]/g, '_');
  name = name.replace(/^_+/g, '');
  name = name.replace(/_+$/g, '');

  return name;
};

export function transform(inputCssText) {
  if (!inputCssText) {
    throw new Error('missing css text to transform');
  }

  // If the input "css" doesn't wrap it with a css class (raw styles)
  // we need to wrap it with a style so the css parser doesn't choke.
  let bootstrapWithCssClass = false;
  if (inputCssText.indexOf('{') === -1) {
    bootstrapWithCssClass = true;
    inputCssText = `.bootstrapWithCssClass { ${inputCssText} }`;
  }

  const css = cssParser.parse(inputCssText);
  let result = {};
  transformRules(this, css.stylesheet.rules, result);

  // Don't expose the implementation detail of our wrapped css class.
  if (bootstrapWithCssClass) {
    result = result.bootstrapWithCssClass;
  }

  return result;
}
