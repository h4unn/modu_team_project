// Todo.model.ts
type RequestParams = {
  /** 내용 */
  content: string;
  label?: string; 
  label_state?: string; 
};

export class Todo {
  static index = 0;
  /** 내용 */
  content: string;
  /** 완료여부 */
  completed: boolean;
  /** 할일 ID */
  id: string;
  /** 라벨 */
  label?: string; 
  /** 상태 */
  label_state? : string;

  constructor(params: RequestParams) {
    /** 라벨 */
    this.label = params.label; 
    /** 상태 */
    this.label_state = params.label_state;
    /** 내용 */
    this.content = params.content;
    /** 완료여부 */
    this.completed = false;
    /** ID */
    this.id = `todo-${++Todo.index}`;
  }
}