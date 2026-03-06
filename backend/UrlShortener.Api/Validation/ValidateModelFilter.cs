using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace UrlShortener.Validation
{
    public class ValidateModelFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Only consider entries that have actual validation errors,
            // ignoring entries that are merely "Unvalidated" with no errors.
            var hasErrors = context.ModelState
                .Where(kvp => kvp.Value!.ValidationState == ModelValidationState.Invalid)
                .Any(kvp => kvp.Value!.Errors.Count > 0);

            if (hasErrors)
            {
                var problem = new ValidationProblemDetails(context.ModelState)
                {
                    Title = "Validation Failed",
                    Detail = "One or more validation errors occurred.",
                    Status = StatusCodes.Status422UnprocessableEntity,
                    Type = "https://httpstatuses.com/422"
                };

                context.Result = new UnprocessableEntityObjectResult(problem);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
    public class EmptyModelValidator : IObjectModelValidator
    {
        public void Validate(ActionContext actionContext, ValidationStateDictionary validationState, string prefix, object model)
        {
        }
    }
}
