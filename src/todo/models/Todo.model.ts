type RequestParams = {
  /** 내용 */
  content: string;
};

export class Todo {
  static index = 0;
  /** 내용 */
  content: string;
  /** 완료여부 */
  completed: boolean;
  /** 할일 ID */
  id: string;

  constructor(params: RequestParams) {
    /** 내용 */
    this.content = params.content;
    /** 완료여부 */
    this.completed = false;
    /** ID */
    this.id = `todo-${++Todo.index}`;
  }
}
