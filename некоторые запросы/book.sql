USE [for_project]
GO

/****** Object:  Table [dbo].[Client]    Script Date: 24.12.2021 3:21:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Book](
	--[id] [int] NOT NULL,
	--[familia] [nvarchar](50) NOT NULL,
	--[name] [nvarchar](50) NOT NULL,
	--[patronymic] [nvarchar](50) NULL,
	--[mail] [nvarchar](100) NOT NULL,
	--[phone] [nvarchar](20) NOT NULL,
	--[login] [nvarchar](50) NOT NULL,
	--[password] [nvarchar](20) NOT NULL,
	[id_key] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[start] date not null,
	[end] date not null,
	[id_client] uniqueidentifier not null,
	[id_room] int not null
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Book] ADD  CONSTRAINT [DF_Book_id_key]  DEFAULT (newid()) FOR [id_key]
GO


