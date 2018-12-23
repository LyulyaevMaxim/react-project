// Simple class decorator
function annotation(target) {
  target.a = true
}

@annotation
class MyClass1 {}

//Class decorator
function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value
  }
}

@isTestable(true)
class MyClass2 {}

//Class function decorator
function enumerable(value) {
  return function(target, key, descriptor) {
    descriptor.enumerable = value
    return descriptor
  }
}

class MyClass3 {
  @enumerable(false)
  method() {}
}
