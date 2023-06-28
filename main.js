// Вам потрібно написати функцію, яка як параметр приймає функцію і додає їй можливість кешувати дзвінки. Ідея полягає в тому, що при виклику функції з однаковими аргументами немає сенсу викликати функцію щоразу, достатньо зберігати дані про результати виклику.
// Зберігати потрібно останні 10 дзвінків.

const memo = (callbackFn) => {
    const cache = {};
    const cacheSize = 10;
    const cacheKeys = [];
  
    const getCache = () => {
        return cache;
    };
  
    const memoizedCallback = (el) => {
        if (el in cache) {
            return cache[el];
        }
    
        const result = callbackFn(el);
    
        if (cacheKeys.length >= cacheSize) {
            const keyToRemove = cacheKeys.shift();
            delete cache[keyToRemove];
        }
    
        cache[el] = result;
        cacheKeys.push(el);
    
        return result;
    };
  
    memoizedCallback.getCache = getCache;
    return memoizedCallback;
};
  
const callbackFn = memo((phone) => {
    return `This is phone: ${phone}`;
});
  
console.log(callbackFn('test'));
console.log(callbackFn('1'));
console.log(callbackFn('2'));
console.log(callbackFn('3'));
console.log(callbackFn('4'));
console.log(callbackFn('5'));
console.log(callbackFn('6'));
console.log(callbackFn('7'));
console.log(callbackFn('8'));
console.log(callbackFn('9'));
console.log(callbackFn('10'));
console.log(callbackFn.getCache()); // Об'єкт не виводить 'test', відповідно логіка зберігання останніх 10 викликів працює

console.log(callbackFn('11'));
console.log(callbackFn.getCache()); // Об'єкт не виводить '1', а виводить '11' у кінці

// Перевіряємо роботу фунцкії
console.log(callbackFn('5'));
console.log(callbackFn.getCache());