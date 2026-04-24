const sanitizeObject = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => sanitizeObject(item));
    return value;
  }

  Object.keys(value).forEach((key) => {
    const sanitizedKey = key.replace(/\$/g, '').replace(/\./g, '');
    const nestedValue = value[key];

    delete value[key];
    value[sanitizedKey] = sanitizeObject(nestedValue);
  });

  return value;
};

const sanitizeRequest = (req, _res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
};

module.exports = { sanitizeRequest };
