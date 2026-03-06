using System.ComponentModel.DataAnnotations;
using UrlShortener.Data.Entities.Plans;
using UrlShortener.Data.Entities.Urls;
using UrlShortener.Data.Entities.Users;
using UrlShortener.Models.Attributes;
using UrlShortener.Models.DTOs;
using UrlShortener.Models.DTOs.Url;

namespace UrlShortener.Core.Domain.Adapters
{
    public static class UrlAdapter
    {
    
        public static URL ToUrl(this CreateUrlDTO dto, User user)
        {
            return new URL
            {
                Source = dto.Source,
                ShortCode = dto.ShortCode,
                Title = dto.Title,
                CreatedBy = user.ID,
                ExpiresAt = DateTime.UtcNow.Date.AddDays(user.Plan.UrlExpiresAfter),
                IsActive = dto.IsActive
            };
        }

        public static FullUrlDTO ToFullDTO(this URL url)
        {
            return new FullUrlDTO
            (
                ID: url.ID,
                Url: "https://www.url.com/" + url.ShortCode,
                ShortCode: url.ShortCode,
                Source: url.Source,
                Title: url.Title ?? "Shortened Link",
                VisitCount: url.VisitCount!.Value,
                CreatedAt: url.CreatedAt!.Value,
                LastModified: url.LastModified!.Value,
                ExpiresAt: url.ExpiresAt,
                isActive: url.IsActive!.Value
            );
        }
    }
}
