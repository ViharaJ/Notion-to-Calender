import {createEvent} from './index.js';

test('Create event with invalid date', () => {
    const date = "18990401";
    expect(() => {createEvent("Fake Title", date)}).toThrow("Invalid date");

});

test('Create event with future date 2', () => {
    const date = "1899";
    expect(() => {createEvent("Fake Title", date)}).toThrow("Invalid date");
});

test('Create event with invalid date 3', () => {
    const date = "July 32, 2005";
    expect(() => {createEvent("Fake Title", date)}).toThrow("Invalid date");
});

