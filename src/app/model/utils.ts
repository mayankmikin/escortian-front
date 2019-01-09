import { SelectedFacets, SelectedCategory } from './filtering';
import { Person } from './escort';

export class Utils
{
    constructor() {}
   public  static arrayRemove(arr:any[], value:string):any[] {

        for(var i=0; i<arr.length;i++)
        {
            if(arr[i]==value)
            {
                arr.splice(i,1);
            }
        }
     
        return arr;
     }


     public static filtering(selectedFacets:SelectedFacets,cat: any, subcat: any,modaldata:any,
        modaldatafull:any,  model: Person[])
     {
       var tempArr:any=[]
          console.log('selected category is :')
          console.log(cat)
          console.log('selected subcategory is :')
          console.log(subcat)
          if(selectedFacets.categories.length>0)
          {
              selectedFacets.categories.forEach(element => {
              
                if(element.categoryname.includes(cat))
                {
                  if(!element.subcategories.includes(subcat))
                  {
                    element.subcategories.push(subcat)
                  }
                  else
                  {
                    console.log('selected subcategory already exists')
                    if(element.subcategories.length==1)
                    {
                      element.subcategories=Utils.arrayRemove(element.subcategories,subcat)
                      selectedFacets.categories.pop()
                      
                    }
                    else
                    {
                      element.subcategories=Utils.arrayRemove(element.subcategories,subcat)
                    }
                    console.log(element.subcategories)
                  }
      
                }
                else
                {
                  var arr=[subcat];
                  selectedFacets.categories.push(
                    new SelectedCategory(cat,arr)
                  )
                }
            });
          }
          else
          {
            var arr=[subcat];
                  selectedFacets.categories.push(
                    new SelectedCategory(cat,arr)
                  )
          }
         
         
         console.log('selected facets are')
         console.log(selectedFacets)
         
          selectedFacets.categories.forEach(element => {
            console.log('selectedFacets element')
            console.log(element)
            modaldatafull.forEach(model => {
                // for simple facet 
                  model.keyword_facets.forEach(simplefacet => {
      
                    console.log('model.keyword_facets')
                    console.log(simplefacet)
                   
                        if(element.categoryname.includes(simplefacet.facet_name))
                        {
                          // console.log('***********************')
                          // console.log('element.subcategories: ',element.subcategories)
                          // console.log('simplefacet.facet_value: ',simplefacet.facet_value)
                          // console.log(element.subcategories.includes(simplefacet.facet_value))
                          // console.log('***********************')
                          
                            if(element.subcategories.includes(simplefacet.facet_value))
                            {
                              if(!tempArr.includes(model)) // push 
                                {
                                    console.log('pushing model')
                                    console.log(model)
                                  // console.log('checking facets value')
                                    //console.log(element.subcategories.includes(simplefacet.facet_value))
                                    tempArr.push(model)
                                }
                               
                            }
      
                        }
                  });

                  // for multi facets 
                  model.keyword_multi_facets.forEach(simplefacet => {
      
                    console.log('model.keyword_facets')
                    console.log(simplefacet)
                   
                        if(element.categoryname.includes(simplefacet.facet_name))
                        {
                          // console.log('***********************')
                          // console.log('element.subcategories: ',element.subcategories)
                          // console.log('simplefacet.facet_value: ',simplefacet.facet_value)
                          // console.log(element.subcategories.includes(simplefacet.facet_value))
                          // console.log('***********************')
                          simplefacet.facet_value.forEach(multifacetElement => {

                            if(element.subcategories.includes(multifacetElement))
                            {
                                console.log('checking for multifacet')
                                console.log(multifacetElement)
                                console.log(element.subcategories.includes(multifacetElement))
                              if(!tempArr.includes(model)) // push 
                                {
                                    console.log('pushing model')
                                    console.log(model)
                                  // console.log('checking facets value')
                                    //console.log(element.subcategories.includes(simplefacet.facet_value))
                                    tempArr.push(model)
                                }
                               
                            }
                              
                          });
      
                        }
                  });

                  // for long facets 
                  model.long_facets.forEach(simplefacet => {
      
                    console.log('model.keyword_facets')
                    console.log(simplefacet)
                        if(element.categoryname.includes(simplefacet.facet_name))
                        {
                          // console.log('***********************')
                          // console.log('element.subcategories: ',element.subcategories)
                          // console.log('simplefacet.facet_value: ',simplefacet.facet_value)
                          // console.log(element.subcategories.includes(simplefacet.facet_value))
                          // console.log('***********************')
                          simplefacet.facet_value.forEach(multifacetElement => {

                            if(element.subcategories.includes(multifacetElement))
                            {
                                console.log('checking for multifacet')
                                console.log(multifacetElement)
                                console.log(element.subcategories.includes(multifacetElement))
                              if(!tempArr.includes(model)) // push 
                                {
                                    console.log('pushing model')
                                    console.log(model)
                                  // console.log('checking facets value')
                                    //console.log(element.subcategories.includes(simplefacet.facet_value))
                                    tempArr.push(model)
                                }
                               
                            }
                              
                          });
                            
                        }
                  });

            });
      
          });
          console.log('after for loop temp Arr is ')
          console.log(tempArr)
      
          if(selectedFacets.categories.length>0)
          {
            
            model=tempArr;
          }
          else
          {
            model=modaldatafull
            tempArr=[];
          }
          console.log('after filerting model is')
          console.log(model)
          return model
        }

     
        public static pricefiltering(selectedFacets:SelectedFacets,cat: any, subcat: any,modaldata:any,
          modaldatafull:any,  model: Person[])
       {
         var tempArr:any=[]
            console.log('selected category is :')
            console.log(cat)
            console.log('selected subcategory is :')
            console.log(subcat)
            if(selectedFacets.categories.length>0)
            {
                selectedFacets.categories.forEach(element => {
                
                  if(element.categoryname.includes(cat))
                  {
                    if(!element.subcategories.includes(subcat))
                    {
                      element.subcategories.push(subcat)
                    }
                    else
                    {
                      console.log('selected subcategory already exists')
                      if(element.subcategories.length==1)
                      {
                        element.subcategories=Utils.arrayRemove(element.subcategories,subcat)
                        selectedFacets.categories.pop()
                        
                      }
                      else
                      {
                        element.subcategories=Utils.arrayRemove(element.subcategories,subcat)
                      }
                      console.log(element.subcategories)
                    }
        
                  }
                  else
                  {
                    var arr=[subcat];
                    selectedFacets.categories.push(
                      new SelectedCategory(cat,arr)
                    )
                  }
              });
            }
            else
            {
              var arr=[subcat];
                    selectedFacets.categories.push(
                      new SelectedCategory(cat,arr)
                    )
            }
           
           
           console.log('selected facets are')
           console.log(selectedFacets)
           
            selectedFacets.categories.forEach(element => {
              console.log('selectedFacets element')
              console.log(element)
              modaldatafull.forEach(model => {
                    // for long facets 
                    model.long_facets.forEach(simplefacet => {
        
                      console.log('model.keyword_facets')
                      console.log(simplefacet)
                          if(element.categoryname.includes(simplefacet.facet_name))
                          {
                            // console.log('***********************')
                            // console.log('element.subcategories: ',element.subcategories)
                            // console.log('simplefacet.facet_value: ',simplefacet.facet_value)
                            // console.log(element.subcategories.includes(simplefacet.facet_value))
                            // console.log('***********************')
                            simplefacet.facet_value.forEach(multifacetElement => {
  
                              if(element.subcategories.includes(multifacetElement))
                              {
                                  console.log('checking for multifacet')
                                  console.log(multifacetElement)
                                  console.log(element.subcategories.includes(multifacetElement))
                                if(!tempArr.includes(model)) // push 
                                  {
                                      console.log('pushing model')
                                      console.log(model)
                                    // console.log('checking facets value')
                                      //console.log(element.subcategories.includes(simplefacet.facet_value))
                                      tempArr.push(model)
                                  }
                                 
                              }
                                
                            });
                              
                          }
                    });
  
              });
        
            });
            console.log('after for loop temp Arr is ')
            console.log(tempArr)
        
            if(selectedFacets.categories.length>0)
            {
              
              model=tempArr;
            }
            else
            {
              model=modaldatafull
              tempArr=[];
            }
            console.log('after filerting model is')
            console.log(model)
            return model
          }

}