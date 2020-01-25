export declare class DependenceChecker {
    private readonly root_path;
    private readonly try_exe;
    private component_dependency;
    constructor(file_path: string);
    private getAST;
    private update;
    private visitor;
    check(): void;
}
