test('Add  2 intergers numbers', ()=>{
    expect(1 + 2).toBe(3);
});

test('Add two strings together', ()=>{
    expect('Hello' + ' '+'World').toBe('Hello World');
});

test('Object assignment', () =>{
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

test(' null is falsy', ()=>{
    const n = null;
    expect(n).toBeFalsy();
});

test(" 1 is truthy", () => {
	const n = 1;
	expect(n).toBeTruthy();
});

test('Throw an invalid input', ()=>{
    function throwError(){
        throw new Error('Invalid input');
    }
    expect(throwError).toThrow('Invalid input');
});
