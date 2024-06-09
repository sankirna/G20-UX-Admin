import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";

export class ProfileSearchModel extends BaseSearchModel {
    name: string | undefined = "";
}

export class ProfileModel {
    id: number | undefined = 0;
    userId: number | undefined = 0;
    firstName: string | undefined = "";
    middleName: string | undefined = "";
    lastName: string | undefined = "";
    sex: number | undefined = 0;
    sexValue: string | undefined = "";
    email: string | undefined = "";
    alternateEmail: string | undefined = "";
    phoneNo: string | undefined = "";
    alternatePhoneNo: string | undefined = "";
    langauge: string | undefined = "";
    otherInformation: string | undefined = "";
    fileUploadRequestModel: FileUploadRequestModel | undefined ;
}

export class AddressModel {
    randomId: string| undefined="";
    id: number | undefined = 0;
    profileId: number | undefined = 0;
    address1: string | undefined = "";
    address2: string | undefined = "";
    landmark: string | undefined = "";
    cityId: number | undefined = 0;
    stateId: number | undefined = 0;
    countryId: number | undefined = 0;
    pinNo: string | undefined = "";
    typeId: number | undefined;
    displayOrder: number | undefined = 0;
}

export class FamilyModel {
    id: number | undefined = 0;
    profileId: number | undefined = 0;
    name: string | undefined = "";
    relationTypeId: number | undefined = 0;
    email: string | undefined = "";
    phoneNo: string | undefined = "";
    description: string | undefined = "";
}

export class EducationModel {
    id: number | undefined = 0;
    profileId: number | undefined = 0;
    name: string | undefined = "";
    startYear: number | undefined = 0;
    startMonth: number | undefined = 0;
    endYear: number | undefined = 0;
    endMonth: number | undefined = 0;
    isPresent: boolean | undefined = false;
    grade: string | undefined = "";
    percentage: number | undefined = 0;
    degree: string | undefined = "";
    description: string | undefined = "";
}

export class OccupationModel {
    id: number | undefined = 0;
    profileId: number | undefined = 0;
    name: string | undefined = "";
    startDate: string | undefined = "";
    endDate: string | undefined = "";
    isPresent: boolean | undefined = false;
    typeId: number | undefined = 0;
    description: string | undefined = "";
}

export class AchivementModel {
    id: number | undefined = 0;
    profileId: number | undefined = 0;
    name: string | undefined = "";
    year: number | undefined = 0;
    description: string | undefined = "";
}

export interface  ProfileEditRequestModel {
    id: number;
    profile: ProfileModel;
    addresses: AddressModel[] ;
    families: FamilyModel[] ;
    educations: EducationModel[] ;
    occupations: OccupationModel[] ;
    achivements: AchivementModel[];
}
