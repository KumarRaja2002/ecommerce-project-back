"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_SIZE_IS_NUMBER = exports.FILE_TYPE_STRING = exports.FILE_TYPE_REQUIRED = exports.FILE_NAME_IS_STRING = exports.FILE_ORIGINAL_NAME_AT_LEAST_5_CHARACTERS = exports.FILE_ORIGINAL_NAME_REQUIRED = exports.MULTIPART_UPLOAD_ABORTED = exports.MULTIPART_UPLOAD_ABORTED_FAILED = exports.MULTIPART_UPLOAD_START_FAILED = exports.MULTIPART_UPLOAD_URLS_FAILED = exports.MULTIPART_UPLOAD_FAILED = exports.MULTIPART_UPLOAD_SUCCESS = exports.MULTIPART_UPLOAD_URLS = exports.MULTIPART_UPLOAD_START = exports.CATEGORIES_RETRIVED = exports.CATEGORY_RESTORED = exports.FILE_NOT_FOUND = exports.ERROR_FETCHING_FILES = exports.ERROR_UPLOADING_FILES = exports.FILES_UPLOADED = exports.ERROR_ARCHIVING_FILES = exports.STATUS_UPDATED_ARCHIVE = exports.FILES_NOT_FOUND = exports.CATEGORY_EXISTS = exports.CATEGORY_ARCHIVED = exports.CATEGORY_DELETED = exports.CATEGORY_UPDATED = exports.CATEGORY_FOUND = exports.CATEGORY_FETCHED = exports.CATEGORY_NOT_FOUND = exports.NAME_ALREADY_EXISTS = exports.DESCRIPTION = exports.UPDATED_BY_NUMBER = exports.CREATED_BY_NUMBER = exports.SLUG_NON_EMPTY = exports.SLUG_STRING = exports.CATEGORY_NON_EMPTY = exports.CATEGORY_STRING = exports.INTERNAL_SERVER_ERROR = exports.CATEGORIES_CREATED = exports.USER_DELETED = exports.USER_UPDATED = exports.USER_FETCHED = exports.USER_LOGIN = exports.SOMETHING_WENT_WRONG = exports.USER_REGISTERED = exports.INVALID_CREDENTIALS = exports.USER_NOT_FOUND = exports.EMAIL_EXISTED = exports.VALIDATION_FAILED = void 0;
exports.FILE_RESTORED = exports.FILE_DELETED = exports.SIZE_MUST_BE_GREATER_THAN_ZERO = exports.SIZE_IS_REQUIRED = exports.PATH_IS_REQUIRED = exports.MIME_IS_REQUIRED = exports.TITLE_IS_REQUIRED = exports.STORAGE_FETCHED = exports.FILE_NON_EMPTY = exports.FILES_DELETED = exports.ARCIVED_FILES_NOT_FOUND = exports.FILE_STATUS_REQUIRED = exports.CATEGORY_ID_REQUIRED = exports.INVALID_FILE_STATUS = exports.INVALID_FILE_TYPE = exports.PASSWORD_STRING = exports.PASSWORD_REQUIRED = exports.EMAIL_INVALID = exports.EMAIL_STRING = exports.EMAIL_REQUIRED = exports.FILES_FETCHED = exports.FILES_ARCHIVED = exports.NO_FILES_FOUND = exports.STATUS_UPDATED_TO_ARCHIVE = exports.FILE_FETCHED = exports.FILE_UPLOADED = exports.AUTHENTICATION_FAILED = exports.PRESIGNED_URL_GENERATED = exports.FILE_SIZE_REQUIRED = exports.FILE_NAME_AT_LEAST_3_CHARACTERS = exports.FILE_NAME_REQUIRED = exports.CANT_UPDATE = exports.FETCHED_INCOMPLETE_PARTS = exports.FILED_TO_FETCH_INCOMPLETE_PARTS = exports.ETAG_STRING = exports.ETAG_REQUIRED = exports.PARTS_NUMBER = exports.UPLOAD_ID_STRING = exports.UPLOAD_ID_REQUIRED = exports.FILE_KEY_STRING = exports.FILE_KEY_REQUIRED = void 0;
exports.VALIDATION_FAILED = "Validation failed";
exports.EMAIL_EXISTED = "Email already exists";
exports.USER_NOT_FOUND = "User not found";
exports.INVALID_CREDENTIALS = "Invalid credentials";
exports.USER_REGISTERED = "User registered successfully";
exports.SOMETHING_WENT_WRONG = "Something went wrong";
exports.USER_LOGIN = "User login successfully";
exports.USER_FETCHED = "User fetched successfully";
exports.USER_UPDATED = "User updated successfully";
exports.USER_DELETED = "User deleted successfully";
exports.CATEGORIES_CREATED = 'Category created successfully';
exports.INTERNAL_SERVER_ERROR = 'Internal Server Error';
exports.CATEGORY_STRING = 'Category name must be a string';
exports.CATEGORY_NON_EMPTY = 'Category not be empty';
exports.SLUG_STRING = 'slug must be a string';
exports.SLUG_NON_EMPTY = 'Slug not be empty';
exports.CREATED_BY_NUMBER = 'Created by must be a number';
exports.UPDATED_BY_NUMBER = 'Updated by should be a number';
exports.DESCRIPTION = 'It should be a group of strings';
exports.NAME_ALREADY_EXISTS = "Name already exists";
exports.CATEGORY_NOT_FOUND = "Category not exist";
exports.CATEGORY_FETCHED = "Categories fetched successfully";
exports.CATEGORY_FOUND = "Category fetched successfully";
exports.CATEGORY_UPDATED = "Category updated successfully";
exports.CATEGORY_DELETED = "Category peramantly deleted successsfully";
exports.CATEGORY_ARCHIVED = "Category deleted successfully";
exports.CATEGORY_EXISTS = "Category already exists";
exports.FILES_NOT_FOUND = "Files not found";
exports.STATUS_UPDATED_ARCHIVE = "Files status updated to archived successfully";
exports.ERROR_ARCHIVING_FILES = "Error archiving files";
exports.FILES_UPLOADED = "File uploaded successfully";
exports.ERROR_UPLOADING_FILES = 'Error uploading file';
exports.ERROR_FETCHING_FILES = "Error fetching files";
exports.FILE_NOT_FOUND = "File not found";
exports.CATEGORY_RESTORED = "Category restored";
exports.CATEGORIES_RETRIVED = "Categories retrived successfully";
//Multi-Part constants
exports.MULTIPART_UPLOAD_START = "Multipart upload started successfully";
exports.MULTIPART_UPLOAD_URLS = "Multipart upload URLs fetched successfully";
exports.MULTIPART_UPLOAD_SUCCESS = "File uploaded successfully";
exports.MULTIPART_UPLOAD_FAILED = "Multipart upload failed";
exports.MULTIPART_UPLOAD_URLS_FAILED = "Failed to fetch multipart upload URLs";
exports.MULTIPART_UPLOAD_START_FAILED = "Failed to start multipart upload";
exports.MULTIPART_UPLOAD_ABORTED_FAILED = "Failed to abort multipart upload";
exports.MULTIPART_UPLOAD_ABORTED = "Multipart upload aborted";
exports.FILE_ORIGINAL_NAME_REQUIRED = "File name is required";
exports.FILE_ORIGINAL_NAME_AT_LEAST_5_CHARACTERS = "File name contains at least 5 characters";
exports.FILE_NAME_IS_STRING = "File name must be a string";
exports.FILE_TYPE_REQUIRED = "File type is must be image, media, document, other";
exports.FILE_TYPE_STRING = "File type must be a string";
exports.FILE_SIZE_IS_NUMBER = "File size must be a number";
exports.FILE_KEY_REQUIRED = "File key is required";
exports.FILE_KEY_STRING = "File key must be a string";
exports.UPLOAD_ID_REQUIRED = "Upload id is required";
exports.UPLOAD_ID_STRING = "Upload id must be a string";
exports.PARTS_NUMBER = "Parts must be a number";
exports.ETAG_REQUIRED = "ETag is required";
exports.ETAG_STRING = "ETag must be a string";
exports.FILED_TO_FETCH_INCOMPLETE_PARTS = "Failed to fetch incomplete parts";
exports.FETCHED_INCOMPLETE_PARTS = "Fetched incomplete parts successfully";
exports.CANT_UPDATE = "Cannot update an archived category";
//Single-File upload
exports.FILE_NAME_REQUIRED = 'File name is required';
exports.FILE_NAME_AT_LEAST_3_CHARACTERS = 'File name must be at least 3 characters';
exports.FILE_SIZE_REQUIRED = 'File size is required';
exports.PRESIGNED_URL_GENERATED = 'Presigned URL generated successfully';
exports.AUTHENTICATION_FAILED = 'User not authenticated';
exports.FILE_UPLOADED = 'File uploaded successfully';
;
exports.FILE_FETCHED = 'File fetched successfully';
exports.STATUS_UPDATED_TO_ARCHIVE = 'File deleted successfully';
exports.NO_FILES_FOUND = "No files found for the given IDs and category";
exports.FILES_ARCHIVED = "Files deleted successfully";
exports.FILES_FETCHED = "Files fetched successfully";
//User
exports.EMAIL_REQUIRED = 'Email is required';
exports.EMAIL_STRING = 'Email must be a string';
exports.EMAIL_INVALID = 'Email is not valid';
exports.PASSWORD_REQUIRED = 'Password is required';
exports.PASSWORD_STRING = 'Password must be a string';
exports.INVALID_FILE_TYPE = "Invalid file type. Allowed types are 'image', 'media', 'document', or 'other'.";
exports.INVALID_FILE_STATUS = "Invalid file status. Allowed statuses are 'active' or 'archieved'.";
exports.CATEGORY_ID_REQUIRED = "Category ID is required.";
exports.FILE_STATUS_REQUIRED = "File status is required.";
exports.ARCIVED_FILES_NOT_FOUND = 'No archived files found for the user.';
exports.FILES_DELETED = 'Archived files deleted successfully.';
exports.FILE_NON_EMPTY = 'File name cannot be empty.';
exports.STORAGE_FETCHED = 'Storage fetched successfully';
exports.TITLE_IS_REQUIRED = 'Title is required';
exports.MIME_IS_REQUIRED = 'Mime type is required';
exports.PATH_IS_REQUIRED = 'Path is required';
exports.SIZE_IS_REQUIRED = 'Size is required';
exports.SIZE_MUST_BE_GREATER_THAN_ZERO = 'Size must be greater than 0';
exports.FILE_DELETED = 'File deleted successfully';
exports.FILE_RESTORED = 'File restored successfully';
