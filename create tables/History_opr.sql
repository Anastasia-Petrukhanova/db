USE [for_project]
GO

/****** Object:  Table [dbo].[History_opr]    Script Date: 24.12.2021 10:47:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[History_opr](
	[id_key] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[status] [nvarchar](100) NOT NULL,
	[time] [datetime] NOT NULL,
	[id_employee] [uniqueidentifier] NULL,
	[id_book] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[History_opr] ADD  CONSTRAINT [DF_History_opr_id_key]  DEFAULT (newid()) FOR [id_key]
GO

ALTER TABLE [dbo].[History_opr]  WITH CHECK ADD FOREIGN KEY([id_book])
REFERENCES [dbo].[Book] ([id_key])
GO

ALTER TABLE [dbo].[History_opr]  WITH CHECK ADD FOREIGN KEY([id_employee])
REFERENCES [dbo].[Employee] ([id_key])
GO


