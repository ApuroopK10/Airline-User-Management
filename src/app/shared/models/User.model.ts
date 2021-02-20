export class User {
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private children: Array<string>;


    constructor(name: string, email: string, password: string, role: string, children: Array<string>) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.children = children;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string) {
        this.role = role;
    }

    public getChildren(): Array<string> {
        return this.children;
    }

    public setChildren(children: Array<string>) {
        this.children = children;
    }
}