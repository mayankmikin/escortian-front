export class SelectedCategory 
{

    categoryname: string
    subcategories:any[]
    constructor(categoryname,subcategories) {
       // console.log('creating object with these values ');
       // console.log(categoryname,subcategories);
        this.categoryname=categoryname;
        this.subcategories=subcategories;
      }
}
  
export class SelectedFacets 
{

    categories: SelectedCategory[]
}