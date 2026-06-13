import {
  NodeSavedStateStore,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedSession,
} from "@atproto/oauth-client-node";
import { AtprotoState, AtprotoSession } from "@/models/AtprotoAuth";
import dbConnect from "./mongodb";

// Interface implementation for OAuth state flow
export const mongoStateStore: NodeSavedStateStore = {
  async get(key: string): Promise<NodeSavedState | undefined> {
    await dbConnect();
    const record = await AtprotoState.findOne({ key }).lean();
    return record ? (JSON.parse(record.value) as NodeSavedState) : undefined;
  },
  async set(key: string, val: NodeSavedState): Promise<void> {
    await dbConnect();
    await AtprotoState.updateOne(
      { key },
      { $set: { value: JSON.stringify(val) } },
      { upsert: true },
    );
  },
  async del(key: string): Promise<void> {
    await dbConnect();
    await AtprotoState.deleteOne({ key });
  },
};

// Interface implementation for long-lived user sessions
export const mongoSessionStore: NodeSavedSessionStore = {
  async get(key: string): Promise<NodeSavedSession | undefined> {
    await dbConnect();
    const record = await AtprotoSession.findOne({ key }).lean();
    return record ? (JSON.parse(record.value) as NodeSavedSession) : undefined;
  },
  async set(key: string, val: NodeSavedSession): Promise<void> {
    await dbConnect();
    await AtprotoSession.updateOne(
      { key },
      { $set: { value: JSON.stringify(val) } },
      { upsert: true },
    );
  },
  async del(key: string): Promise<void> {
    await dbConnect();
    await AtprotoSession.deleteOne({ key });
  },
};
