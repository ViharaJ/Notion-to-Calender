import {createEvent, isValidTimeZone} from './index.js';

test('Create event with invalid date', () => {
    const date = "18990401";
    expect(() => {createEvent("Fake Title", date, 'America/Vancouver')}).toThrow("Invalid date");

});

test('Create event with future date 2', () => {
    const date = "1899";
    expect(() => {createEvent("Fake Title", date, 'America/Vancouver')}).toThrow("This movie has already been released");
});

test('Create event with invalid date 3', () => {
    const date = "July 32, 2005";
    expect(() => {createEvent("Fake Title", date, 'America/Vancouver')}).toThrow("Invalid date");
});

test('Create event with invalid date 3', () => {
    const date = "July 32, 2005";
    expect(() => {createEvent("Fake Title", date, 'America/Vancouver')}).toThrow("Invalid date");
});


test('invalid timezone', () => {
    const date = "July 12, 2025";
    expect(() => {createEvent("Fake Title", date, 'Narina')}).toThrow("Invalid timezone");
});