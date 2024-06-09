export class EnumModel {
    value: number | undefined=0;
    key: string | undefined="";
    description: string | undefined="";
  }

  export class PrimaryDataModel {
    addressTypes: EnumModel[] | undefined;
    occupationTypes: EnumModel[] | undefined;
    relationTypes: EnumModel[] | undefined;
    roles: EnumModel[] | undefined;
    genderTypes: EnumModel[] | undefined;
    fileTypes: EnumModel[] | undefined;
  }
  