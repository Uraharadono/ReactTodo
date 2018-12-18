import Enum from '../common/enum';

export default class EExampleEnumRoles extends Enum {
    static RegularUser = 1
    static Clerk = 2
    static Worker = 3
    static Manager = 4
    static Director = 5

    static display(value) {
        switch (value) {
            case EExampleEnumRoles.RegularUser:
                return 'Regular user';
            case EExampleEnumRoles.Clerk:
                return 'Clerk';
            case EExampleEnumRoles.Worker:
                return 'Worker';
            case EExampleEnumRoles.Manager:
                return 'Manager';
            case EExampleEnumRoles.Director:
                return 'Director';
            default:
                throw new Error(`EExampleEnumRoles enum does not contain value '${value}'`);
        }
    }
}