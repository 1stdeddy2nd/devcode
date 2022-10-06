export interface TodoItem {
    "id": number;
    "title": string;
    "is_active": number;
    "priority": string;
    "created_at": Date;
    "updated_at": Date;
    "deleted_at": Date | null;
    "activity_group_id": number;
}
