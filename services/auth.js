import { v4 as uuidv4 } from "uuid";

const sessionMap = new Map();

export function createSession(user) {
    const sessionId = uuidv4();
    sessionMap.set(sessionId, user);
    return sessionId;
}

export function getUser(sessionId) {
    return sessionMap.get(sessionId);
}

export function deleteSession(sessionId) {
    sessionMap.delete(sessionId);
}
