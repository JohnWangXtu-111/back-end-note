package static_;
class Person {
    String name;
}
public class Param {
    //call by value
    public static void swap(Person a, Person b) {
        Person t = a;
        a = b;
        b = a;
    }
    public static void main(String[] args) {
        var a = new Person();
        a.name = "a";

        var b = new Person();
        b.name = "b";
        swap(a, b);
        //call by value
        System.out.println("a name is " + a.name);
        System.out.println("b name is " + b.name);
    }
}
