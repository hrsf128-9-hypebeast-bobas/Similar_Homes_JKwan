const setupPrototypalMethodInheritance = function setupPrototypalMethodInheritance(
  Subclass, Class,
) {
  // eslint-disable-next-line no-param-reassign
  Subclass.prototype = Object.create(Class.prototype);
  Object.defineProperty(Subclass.prototype, 'constructor', {
    value: Subclass,
    enumerable: false,
    writable: true,
  });
};

module.exports = setupPrototypalMethodInheritance;
