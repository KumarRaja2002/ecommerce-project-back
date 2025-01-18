"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecordByField = exports.deleteSingleRecord = exports.updateSingleRecord = exports.getRecordByColumn = exports.addSingleRecord = void 0;
const db_1 = require("../lib/db");
const drizzle_orm_1 = require("drizzle-orm");
const addSingleRecord = (tableName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = yield db_1.db.insert(tableName).values(data).returning();
    return responseData[0];
});
exports.addSingleRecord = addSingleRecord;
const getRecordByColumn = (tableName, column, value) => __awaiter(void 0, void 0, void 0, function* () {
    const columnInfo = drizzle_orm_1.sql.raw(`${(0, drizzle_orm_1.getTableName)(tableName)}.${column}`);
    const userData = yield db_1.db.select().from(tableName).where((0, drizzle_orm_1.eq)(columnInfo, value));
    return userData[0];
});
exports.getRecordByColumn = getRecordByColumn;
const updateSingleRecord = (tableName, data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = yield db_1.db
        .update(tableName)
        .set(data)
        .where((0, drizzle_orm_1.eq)(tableName.id, id))
        .returning();
    return responseData[0];
});
exports.updateSingleRecord = updateSingleRecord;
const updateRecordByField = (tableName, data, fieldValue, fieldName) => __awaiter(void 0, void 0, void 0, function* () {
    const columnInfo = drizzle_orm_1.sql.raw(`${(0, drizzle_orm_1.getTableName)(tableName)}.${fieldName}`);
    const responseData = yield db_1.db
        .update(tableName)
        .set(data)
        .where((0, drizzle_orm_1.eq)(columnInfo, fieldValue))
        .returning();
    return responseData[0];
});
exports.updateRecordByField = updateRecordByField;
const deleteSingleRecord = (tableName, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.db.delete(tableName).where((0, drizzle_orm_1.eq)(tableName.id, id));
});
exports.deleteSingleRecord = deleteSingleRecord;
