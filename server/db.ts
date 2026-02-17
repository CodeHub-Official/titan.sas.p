import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, fileUploads, InsertFileUpload, services, InsertService, packages, InsertPackage, appointments, InsertAppointment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// File Upload Queries
export async function createFileUpload(data: InsertFileUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(fileUploads).values(data);
}

export async function getUserFiles(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(fileUploads).where(eq(fileUploads.userId, userId));
}

export async function deleteFileUpload(fileId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(fileUploads).where(eq(fileUploads.id, fileId));
}

// Service Queries
export async function getAllServices() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(services).where(eq(services.isActive, 1));
}

export async function createService(data: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(services).values(data);
}

export async function updateService(serviceId: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(services).set(data).where(eq(services.id, serviceId));
}

// Package Queries
export async function getAllPackages() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(packages).where(eq(packages.isActive, 1));
}

export async function createPackage(data: InsertPackage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(packages).values(data);
}

export async function updatePackage(packageId: number, data: Partial<InsertPackage>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(packages).set(data).where(eq(packages.id, packageId));
}

// Appointment Queries
export async function createAppointment(data: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(appointments).values(data);
}

export async function getAppointments(limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(appointments).limit(limit);
}

export async function updateAppointmentStatus(appointmentId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.update(appointments).set({ status: status as any }).where(eq(appointments.id, appointmentId));
}
