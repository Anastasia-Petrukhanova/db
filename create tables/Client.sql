USE [for_project]
GO

/****** Object:  Table [dbo].[Client]    Script Date: 24.12.2021 10:44:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Client](
	[familia] [nvarchar](50) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[patronymic] [nvarchar](50) NULL,
	[mail] [nvarchar](100) NOT NULL,
	[phone] [nvarchar](20) NOT NULL,
	[login] [nvarchar](50) NOT NULL,
	[password] [nvarchar](20) NOT NULL,
	[id_key] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Client] ADD  CONSTRAINT [DF_Client_id_key]  DEFAULT (newid()) FOR [id_key]
GO


