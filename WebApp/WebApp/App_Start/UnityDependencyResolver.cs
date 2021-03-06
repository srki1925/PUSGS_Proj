﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http.Dependencies;
using Unity;
using Unity.Lifetime;
using WebApp.Persistence;
using WebApp.Persistence.Repository;
using WebApp.Persistence.Repository.AdminRepo;
using WebApp.Persistence.Repository.BusRepo;
using WebApp.Persistence.Repository.DepartureRepo;
using WebApp.Persistence.Repository.LineRepo;
using WebApp.Persistence.Repository.PriceListItemRepo;
using WebApp.Persistence.Repository.PriceListRepo;
using WebApp.Persistence.Repository.PutnikRepo;
using WebApp.Persistence.Repository.StationRepo;
using WebApp.Persistence.Repository.TicketDefinitionRepo;
using WebApp.Persistence.Repository.TicketRepo;
using WebApp.Persistence.Repository.UsersRepository;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.App_Start
{
	public class UnityResolver : IDependencyResolver
	{
		protected IUnityContainer container;

		public UnityResolver(IUnityContainer container)
		{
			if (container == null)
			{
				throw new ArgumentNullException("container");
			}
			this.container = container;
		}

		public object GetService(Type serviceType)
		{
			try
			{
				return container.Resolve(serviceType);
			}
			catch (ResolutionFailedException)
			{
				return null;
			}
		}

		public IEnumerable<object> GetServices(Type serviceType)
		{
			try
			{
				return container.ResolveAll(serviceType);
			}
			catch (ResolutionFailedException)
			{
				return new List<object>();
			}
		}

		public IDependencyScope BeginScope()
		{
			var child = container.CreateChildContainer();
			return new UnityResolver(child);
		}

		public void RegisterTypes()
		{
			// NOTE: To load from web.config uncomment the line below. Make sure to add a
			// Unity.Configuration to the using statements. container.LoadConfiguration();

			// TODO: Register your type's mappings here. container.RegisterType<IProductRepository, ProductRepository>();

			container.RegisterType<DbContext, ApplicationDbContext>(new PerResolveLifetimeManager());
			container.RegisterType<IUnitOfWork, UnitOfWork>();
			container.RegisterType<IPassengerRepository, PassengerRepository>();
			container.RegisterType<IAdministratorRepository, AdministratorRepository>();
			container.RegisterType<ILineRepository, LineRepository>();
			container.RegisterType<IBusStationRepository, BusStationRepository>();
			container.RegisterType<IDepartureRepository, DepartureRepository>();
			container.RegisterType<ITicketRepository, TicketRepository>();
			container.RegisterType<IBusRepository, BusRepository>();
			container.RegisterType<IPriceListRepository, PriceListRepository>();
			container.RegisterType<IPriceListItemRepository, PriceListItemRepository>();
			container.RegisterType<IConductorRepository, ConductorRepository>();
			container.RegisterType<IUserRepository, UserRepository>();
			container.RegisterType<ITicketDefinitionRepository, TicketDefinitionRepository>();
		}

		public void Dispose()
		{
			Dispose(true);
		}

		protected virtual void Dispose(bool disposing)
		{
			container.Dispose();
		}
	}
}